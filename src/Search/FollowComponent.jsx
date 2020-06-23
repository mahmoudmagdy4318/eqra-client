import React, { Fragment, useContext } from 'react';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import Button from "@material-ui/core/Button";
import { UserContext } from '../context/userContext';
const FollowComponent = (props) => {
    const {
        data: { currentUserFollowersId },
      } = useContext(UserContext);
    const userId = props.userId;
    return(
        <Fragment>
            {
                currentUserFollowersId.includes(userId) ?
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={<PersonAddDisabledIcon fontSize={"small"} />}
                >
                  UnFollow
                </Button>
                :
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={<PersonAddIcon fontSize={"small"} />}
                >
                  Follow
                </Button>
            }
        </Fragment>
    )
}
export default FollowComponent;