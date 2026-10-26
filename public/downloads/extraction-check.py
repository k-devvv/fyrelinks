"""Original static fixture correctness check. Standard library only; no network.
Download alongside extraction-practice.html and extraction-practice-expected.json.
Run: python extraction-check.py
This is not a vendor benchmark or a dynamic-page extraction test.
"""
from pathlib import Path
from html.parser import HTMLParser
import hashlib
import json
import platform

class PlansParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_plans = False
        self.in_cell = False
        self.cells = []
        self.cell = []
        self.rows = []

    def handle_starttag(self, tag, attrs):
        if tag == "table" and dict(attrs).get("id") == "plans":
            self.in_plans = True
        if self.in_plans and tag == "tr":
            self.cells = []
        if self.in_plans and tag == "td":
            self.in_cell = True
            self.cell = []

    def handle_data(self, data):
        if self.in_cell:
            self.cell.append(data)

    def handle_endtag(self, tag):
        if tag == "td" and self.in_cell:
            self.cells.append("".join(self.cell).strip())
            self.in_cell = False
        if tag == "tr" and self.in_plans and self.cells:
            self.rows.append(self.cells)
        if tag == "table":
            self.in_plans = False

def run():
    root = Path(__file__).resolve().parent
    html = (root / "extraction-practice.html").read_bytes()
    expected_bytes = (root / "extraction-practice-expected.json").read_bytes()
    expected = json.loads(expected_bytes)
    parser = PlansParser()
    parser.feed(html.decode("utf-8"))
    actual = {"fictional": True, "currency": "USD", "billing_period": "month", "plans": [
        {"name": row[0], "price": int(row[1]), "included_pages": int(row[2])} for row in parser.rows
    ]}
    result = {"python_version": platform.python_version(), "method": "Python html.parser; local static fixture; no network", "sha256": {
        "fixture": hashlib.sha256(html).hexdigest(), "expected": hashlib.sha256(expected_bytes).hexdigest(),
        "script": hashlib.sha256(Path(__file__).read_bytes()).hexdigest()},
        "matched_expected": actual == expected, "rows_recovered": len(actual["plans"]), "actual": actual,
        "limitations": "One fictional static table. No vendor, speed, browser, JavaScript or GPU comparison."}
    print(json.dumps(result, indent=2))
    if actual != expected:
        raise SystemExit(1)

if __name__ == "__main__":
    run()
