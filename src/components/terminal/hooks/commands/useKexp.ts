import { CommandResponse } from "../../models/commandResponse";
import { CommandStatusCode } from "../../models/commandStatusCode";

export const useKexp = () => {
  const kexp = async (args?: string[]): Promise<CommandResponse> => {
    return {
      statusCode: CommandStatusCode.SUCCESS,
      output: "we're processing actions...",
    };
  };

  return { kexp };
};
