import { Models } from "@rematch/core";
import { frame } from "./frame";

export interface RootModel extends Models<RootModel> {
    frame: typeof frame;
}

export const models: RootModel = { frame };
