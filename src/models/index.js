// @ts-check
import { initSchema } from "@aws-amplify/datastore";
import { schema } from "./schema";
import Amplify from "@aws-amplify/core";
import awsmobile from "../aws-exports";
Amplify.configure(awsmobile);
const { Post } = initSchema(schema);

export { Post };
