//import { useState, useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview'
//import bundle from '../bundler'
import Resizable from './resizable'
import { Cell } from '../state'
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';

interface CodeCellProps {
    cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
    //bundling logic is now handled by Redux side so 
    //no need of this states
    // const [code, setCode] = useState(''); 
    // const [err, setErr] = useState('');
    const { updateCell } = useActions();
    const bundle = useTypedSelector((state) => state.bundles[cell.id]);
    console.log(bundle)

    // useEffect(() => {
    //     const timer = setTimeout(async () => {
    //         const output = await bundle(cell.content)
    //         setCode(output.code);
    //         setErr(output.err);

    //     }, 1000);

    //     return () => {
    //         clearTimeout(timer)
    //     };
    // }, [cell.content]);



    return (
        <Resizable direction="vertical">
            <div style={{ height: 'calc(100%-10px)', display: 'flex', flexDirection: 'row' }}>
                <Resizable direction="horizontal">
                    <CodeEditor
                        initialValue={cell.content}
                        onChange={(value) => updateCell(cell.id, value)}
                    />
                </Resizable>
                {/*<Preview code={code} err={err} />*/}
                <Preview code={bundle.code} err={bundle.err} />
            </div>
        </Resizable>
    );
};

export default CodeCell;
