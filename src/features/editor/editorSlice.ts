import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EditorState {
  value: string;
  languageId: number;
  monacoTheme: any;
  options: any;
}

const initialState: EditorState = {
  value: "",
  languageId: 24,
  monacoTheme: "vs-dark",
  options: {
    acceptSuggestionOnCommitCharacter: true,
    acceptSuggestionOnEnter: "on",
    accessibilitySupport: "auto",
    autoIndent: false,
    automaticLayout: true,
    codeLens: true,
    colorDecorators: true,
    contextmenu: true,
    cursorBlinking: "blink",
    cursorSmoothCaretAnimation: false,
    cursorStyle: "line",
    disableLayerHinting: false,
    disableMonospaceOptimizations: false,
    dragAndDrop: false,
    fixedOverflowWidgets: false,
    folding: true,
    foldingStrategy: "auto",
    fontLigatures: false,
    formatOnPaste: false,
    formatOnType: false,
    hideCursorInOverviewRuler: false,
    highlightActiveIndentGuide: true,
    links: true,
    mouseWheelZoom: false,
    multiCursorMergeOverlapping: true,
    multiCursorModifier: "alt",
    overviewRulerBorder: true,
    overviewRulerLanes: 2,
    quickSuggestions: true,
    quickSuggestionsDelay: 100,
    readOnly: false,
    renderControlCharacters: false,
    renderFinalNewline: true,
    renderIndentGuides: true,
    renderLineHighlight: "all",
    renderWhitespace: "none",
    revealHorizontalRightPadding: 30,
    roundedSelection: true,
    rulers: [],
    scrollBeyondLastColumn: 0,
    scrollBeyondLastLine: false,
    selectOnLineNumbers: true,
    selectionClipboard: true,
    selectionHighlight: true,
    showFoldingControls: "mouseover",
    smoothScrolling: true,
    suggestOnTriggerCharacters: true,
    wordBasedSuggestions: true,
    // eslint-disable-next-line
    wordSeparators: `~!@#$%^&*()-=+[{]}\|;:'",.<>/?`,
    wordWrap: "off",
    wordWrapBreakAfterCharacters: "\t})]?|&,;",
    wordWrapBreakBeforeCharacters: "{([+",
    wordWrapBreakObtrusiveCharacters: ".",
    wordWrapColumn: 80,
    wordWrapMinified: true,
    wrappingIndent: "none",
  },
};

const editorDetails = createSlice({
  name: "editorDetails",
  initialState,
  reducers: {
    setValue(state, action: PayloadAction<any>) {
      state.value = action.payload;
    },
    setLanguageId(state, action: PayloadAction<any>) {
      state.languageId = action.payload;
    },
    setMonacoTheme(state, action: PayloadAction<any>) {
      state.monacoTheme = action.payload;
    },
    setOptions(state, action: PayloadAction<any>) {
      state.options = action.payload;
    },
  },
});

export const { setValue, setLanguageId, setMonacoTheme, setOptions } =
  editorDetails.actions;

export default editorDetails.reducer;
