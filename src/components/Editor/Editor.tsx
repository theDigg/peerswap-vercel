import React from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import MonacoEditor from "@monaco-editor/react";
import Settings, { defineTheme } from "./Settings";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/rootReducer";
import { setValue, setMonacoTheme } from "features/editor/editorSlice";
import CodeIcon from "@mui/icons-material/Code";
import SettingsIcon from "@mui/icons-material/Settings";
import PreviewIcon from "@mui/icons-material/Preview";
import MarkdownPost from "components/MarkdownPost";
import { submitDisputeEvidence } from "api/peerswapAPI";
import { VariantType, useSnackbar } from "notistack";

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

const Editor = _ => {
  const dispatch = useDispatch();
  const { options, languageId, monacoTheme, value } = useSelector(
    (state: RootState) => state.editor
  );

  const language = supportedLanguages.find(({ id }) => id === languageId).name;

  function handleEditorWillMount(monaco) {
    if (!defaultThemes.includes(monacoTheme)) {
      defineTheme(monacoTheme).then(() =>
        dispatch(setMonacoTheme(monacoTheme))
      );
    }
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.Latest,
      module: monaco.languages.typescript.ModuleKind.ES2015,
      allowNonTsExtensions: true,
      lib: ["es2018"],
    });
  }

  function handleInputChange(input) {
    dispatch(setValue(input));
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        // p: 1,
        // pt: 1.5,
        // mb: 1.5,
      }}
    >
      <MonacoEditor
        theme={monacoTheme}
        height="80vh"
        path={language}
        defaultValue={value}
        defaultLanguage={language}
        options={options}
        beforeMount={handleEditorWillMount}
        onChange={handleInputChange}
      />
      {/* <Settings /> */}
    </Box>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

interface LinkTabProps {
  label?: string;
  href?: string;
  icon?: any;
}

function LinkTab(props: LinkTabProps) {
  return (
    <Tab
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

function BasicTabs() {
  // const dispatch = useDispatch();
  const router = useRouter();
  const { value } = useSelector((state: RootState) => state.editor);
  const { wallet } = useSelector((state: RootState) => state.wallet);
  const { enqueueSnackbar } = useSnackbar();
  const [tab, setTab] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newTab: number) => {
    setTab(newTab);
  };

  const handleClickVariant = (variant: VariantType, response: string) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(response, { variant });
  };

  function handleSubmit() {
    submitDisputeEvidence(router.query.slug as string, value, wallet).then(
      ({ result }: any) => {
        handleClickVariant(result.status, result.reason)();
      }
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider", display: "flex" }}>
        <Tabs
          value={tab}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <LinkTab icon={<CodeIcon />} label="Editor" />
          <LinkTab icon={<PreviewIcon />} label="Preview" />
          <LinkTab icon={<SettingsIcon />} label="Settings" />
        </Tabs>
        <Box sx={{ flexGrow: 1 }} />
        <Button variant="contained" sx={{ my: "auto" }} onClick={handleSubmit}>
          Submit Evidence
        </Button>
      </Box>
      <TabPanel value={tab} index={0}>
        <Editor />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <MarkdownPost content={value} />
      </TabPanel>
      <TabPanel value={tab} index={2}>
        <Settings />
      </TabPanel>
    </Box>
  );
}

export default BasicTabs;
