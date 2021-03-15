import './add-cell.css';
import { useActions } from '../hooks/use-actions';

interface AddCellProps {
    previousCellId: string | null;
    //? means this is just optional
    forceVisible?: boolean;
}


const AddCell: React.FC<AddCellProps> = ({ forceVisible, previousCellId }) => {

    const { insertCellAfter } = useActions();
    //this(&&) says that if force visible is true just add in class name of force-visible
    return <div className={`add-cell ${forceVisible && 'force-visible'}`}>
        <div className="add-buttons">
            <button className="button is-rounded is-primary is-small" onClick={() => insertCellAfter(previousCellId, 'code')}>
                <span className="icon is-small">
                    <i className="fas fa-plus" />
                </span>
                <span>Code</span>
            </button>
            <button className="button is-rounded is-primary is-small" onClick={() => insertCellAfter(previousCellId, 'text')}>
                <span className="icon is-small">
                    <i className="fas fa-plus" />
                </span>
                <span>Text</span>

            </button>
        </div>
        <div className="divider"></div>
    </div>
};


export default AddCell;
