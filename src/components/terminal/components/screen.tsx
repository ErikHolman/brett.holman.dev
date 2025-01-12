import { Box, CssBaseline } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import { Propmt, PromptHistory } from "./prompt";
import { ResponseBuffer } from "./responseBuffer";
import { Footer } from "./footer";
import { useCommandProcessing } from "../hooks/useCommandProcessing";
import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { useTerminalForm } from "../hooks/useTerminalForm";
import { SessionState } from "../models";

interface ScreenProps {
  currentDirectory: string;
  focused: boolean;
  commandMode: boolean;
  sessionState: SessionState;
  updateSessionState: (_: Partial<SessionState>) => void;
}

const useStyles = makeStyles({
  root: {
    backgroundColor: "#292929",
    minWidth: "100%",
    height: "100vh",
    position: "fixed",
  },
});

export const Screen = ({
  currentDirectory,
  focused,
  commandMode,
  sessionState,
  updateSessionState,
}: ScreenProps) => {
  const classes = useStyles();

  const [previousCommandSuccessful, setPreviousCommandSuccessful] =
    useState(true);

  const { methods } = useTerminalForm();
  const { processCommand, history } = useCommandProcessing({
    ...methods,
    sessionState,
    updateSessionState,
  });

  const handleOnClick = (e: any) => {
    e.preventDefault();
    console.log("yo");
    methods.setFocus("hiddenInput");
  };

  const handleOnSubmit = async (event: any) => {
    event.preventDefault();
    const previousCommand = await processCommand(currentDirectory);
    setPreviousCommandSuccessful(previousCommand);
  };

  return (
    <>
      <CssBaseline />
      <Box className={classes.root} onClick={handleOnClick}>
        <PromptHistory history={history} />
        <FormProvider {...methods}>
          <form onSubmit={handleOnSubmit}>
            <Propmt
              currentDirectory={currentDirectory}
              focused={focused}
              previousCommandSuccessful={previousCommandSuccessful}
              commandMode={commandMode}
            />
          </form>
        </FormProvider>
        <ResponseBuffer />
        <Footer
          sessionState={sessionState}
          updateSessionState={updateSessionState}
        />
      </Box>
    </>
  );
};
