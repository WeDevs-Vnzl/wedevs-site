export type ProjectType = "own" | "client";

type Meta = {
  labelKey: "typeOwn" | "typeClient";
  className: string;
};

// own = highlighted (accent); client = neutral but visible
const META: Record<ProjectType, Meta> = {
  own: {
    labelKey: "typeOwn",
    className: "border-accent/30 bg-accent/8 text-accent",
  },
  client: {
    labelKey: "typeClient",
    className: "border-ink/30 bg-ink/8 text-ink",
  },
};

export const projectTypeMeta = (type: ProjectType) => META[type];
