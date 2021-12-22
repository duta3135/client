import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import React, { Component, useState, useEffect } from 'react'

export default function TextFunc(){
    // const [editorState, setEditorState] = useState(EditorState.createEmpty())
    // const onEditorStateChange = (editorState) => {
    //     setEditorState(editorState)
    // }
    return (
        <div>
            <h1>h1</h1>
            {/* <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorStateChange}
            /> */}
        </div>
    )
}