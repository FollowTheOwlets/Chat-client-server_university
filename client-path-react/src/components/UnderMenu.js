
import Button from "react-bootstrap/Button";

const UnderMenu = (props) => {

    return (
        <div className={"under-menu"}>
            <Button variant={`${props.mailsType === props.INCOMING ? "success" : "outline-light"}`} onClick={props.setIncoming}
                    size="sm">Incoming</Button>
            <Button variant={`${props.mailsType === props.OUTGOING ? "success" : "outline-light"}`} onClick={props.setOutgoing}
                    size="sm">Outgoing</Button>
        </div>
    );
};

export default UnderMenu;