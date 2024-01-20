import * as React from 'react';
import styles from "./styles.module.css"

type Props = {
    photo: string;
}

const UserAvatar: React.FC<Props> = (props) => {
    return (
        <div className={styles.avatar} style={props.photo? {background: props.photo} : {}}/>
    );
}

export default UserAvatar;
