// Fill this in with the real person who writes and tests for the site.
// While `name` is empty every byline stays "FyreLinkz Editorial" and the
// author box is hidden, so nothing here is ever shown as a made-up identity.
export const AUTHOR = {
  name: "",
  role: "",
  bio: "",
  photo: "",
  testRig: "",
  links: [] as { label: string; href: string }[]
};

export const bylineName = (fallback = "FyreLinkz Editorial") => AUTHOR.name || fallback;
