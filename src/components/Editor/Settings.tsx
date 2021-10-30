import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/rootReducer";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Editor, { loader } from "@monaco-editor/react";
import monacoThemes from "monaco-themes/themes/themelist.json";
import {
  setLanguageId,
  setMonacoTheme,
  setOptions,
} from "features/editor/editorSlice";

const defaultThemes = ["vs-dark", "light"];
const supportedLanguages = [
  { id: 1, name: "apex" },
  { id: 2, name: "azcli" },
  { id: 3, name: "bat" },
  { id: 4, name: "c" },
  { id: 5, name: "clojure" },
  { id: 6, name: "coffeescript" },
  { id: 7, name: "cpp" },
  { id: 8, name: "csharp" },
  { id: 9, name: "csp" },
  { id: 10, name: "css" },
  { id: 11, name: "dockerfile" },
  { id: 12, name: "fsharp" },
  { id: 13, name: "go" },
  { id: 14, name: "graphql" },
  { id: 15, name: "handlebars" },
  { id: 16, name: "html" },
  { id: 17, name: "ini" },
  { id: 18, name: "java" },
  { id: 19, name: "javascript" },
  { id: 20, name: "json" },
  { id: 21, name: "kotlin" },
  { id: 22, name: "less" },
  { id: 23, name: "lua" },
  { id: 24, name: "markdown" },
  { id: 25, name: "msdax" },
  { id: 26, name: "mysql" },
  { id: 27, name: "objective-c" },
  { id: 28, name: "pascal" },
  { id: 29, name: "perl" },
  { id: 30, name: "pgsql" },
  { id: 31, name: "php" },
  { id: 32, name: "plaintext" },
  { id: 33, name: "postiats" },
  { id: 34, name: "powerquery" },
  { id: 35, name: "powershell" },
  { id: 36, name: "pug" },
  { id: 37, name: "python" },
  { id: 38, name: "r" },
  { id: 39, name: "razor" },
  { id: 40, name: "redis" },
  { id: 41, name: "redshift" },
  { id: 42, name: "ruby" },
  { id: 43, name: "rust" },
  { id: 44, name: "sb" },
  { id: 45, name: "scheme" },
  { id: 46, name: "scss" },
  { id: 47, name: "shell" },
  { id: 48, name: "sol" },
  { id: 49, name: "sql" },
  { id: 50, name: "st" },
  { id: 51, name: "swift" },
  { id: 52, name: "tcl" },
  { id: 53, name: "typescript" },
  { id: 54, name: "vb" },
  { id: 55, name: "xml" },
  { id: 56, name: "yaml" },
];

export const defineTheme = (theme) => {
  return new Promise<void>((res) => {
    Promise.all([
      loader.init(),
      import(`monaco-themes/themes/${monacoThemes[theme]}.json`),
    ]).then(([monaco, themeData]) => {
      monaco.editor.defineTheme(theme, themeData);
      res();
    });
  });
};

const Settings = () => {
  const dispatch = useDispatch();
  const { options, languageId, monacoTheme } = useSelector(
    (state: RootState) => state.editor
  );

  const [isEditorReady, setIsEditorReady] = useState(false);

  const editorRef = useRef();

  function handleLanguageChange(ev) {
    dispatch(setLanguageId(ev.target.value));
  }

  function handleThemeChange(ev) {
    const theme = ev.target.value;

    if (defaultThemes.includes(theme)) {
      dispatch(setMonacoTheme(theme));
    } else {
      defineTheme(theme).then(() => dispatch(setMonacoTheme(theme)));
    }
  }

  function getEditorValue() {
    //@ts-ignore
    return editorRef?.current?.getValue();
  }

  function handleEditorDidMount(editor, monaco) {
    setIsEditorReady(true);
    editorRef.current = editor;
  }

  function handleApply() {
    const currentValue = getEditorValue();
    let options;
    try {
      options = JSON.parse(currentValue);
      dispatch(setOptions(options));
    } catch {
      //   showNotification({
      //     message: config.messages.invalidOptions,
      //     variant: "error",
      //   });
    }
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        pl: 2,
        "& button": { mr: 5 },
        width: "100%",
      }}
    >
      {/* <Typography variant="h5">Settings</Typography>
      <Divider /> */}
      <Box sx={{ width: "100%", my: 2 }}>
        <Typography sx={{ my: 1 }} variant="h6">
          Languages
        </Typography>
        <TextField
          select
          variant="filled"
          value={languageId}
          onChange={handleLanguageChange}
          fullWidth
          label="Language"
        >
          {supportedLanguages.map((language) => (
            <MenuItem key={language.id} value={language.id}>
              {language.name}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Box>
        <Typography sx={{ my: 1 }} variant="h6">
          Themes
        </Typography>
        <TextField
          select
          variant="filled"
          value={monacoTheme}
          onChange={handleThemeChange}
          fullWidth
          label="Theme"
        >
          {defaultThemes.map((theme) => (
            <MenuItem key={theme} value={theme}>
              {theme}
            </MenuItem>
          ))}
          <MenuItem disabled>
            <Divider />
          </MenuItem>
          {Object.entries(monacoThemes).map(([themeId, themeName]) => (
            <MenuItem key={themeId} value={themeId}>
              {themeName}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Box>
        <Typography sx={{ my: 1 }} variant="h6">
          Options
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          For full list of options with descriptions visit{" "}
          <Link
            href={
              "https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditoroptions.html#acceptsuggestiononcommitcharacter"
            }
            rel="noreferrer"
            target="_blank"
          >
            here
          </Link>
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          Now you can change options below, press apply and see result in the
          left side editor
        </Typography>
        <Box sx={{ my: 2 }}>
          <Editor
            theme={monacoTheme}
            language="json"
            height={400}
            value={JSON.stringify(options, null, 2)}
            onMount={handleEditorDidMount}
          />
        </Box>
        <Button
          variant="outlined"
          disabled={!isEditorReady}
          onClick={handleApply}
        >
          Apply
        </Button>
      </Box>
    </Box>
  );
};

export default Settings;
