const PopUp = {

    showPopUpWindow: (_this, content, wait = null, callBack = null, closeCaption = 'Close', backArrow = 'fa fa-arrow-left') => {
        // _this.showHideNotePad(true);

        const popUp = <div className="modal-backdrop modal-backdrop_full">
            <div className="modal-footer">

                <button className="ibtn float-left" type="button" onClick={() => {
                }}>
                    <i className={backArrow}></i>
                </button>

                <button className="ibtn" type="button" onClick={() => {
                    closePopUpWindow(_this);
                }}>
                    {closeCaption}
                </button>
            </div>
            <div className="modal-content modal-content-full">
                <div className="modal-body">
                    {content}
                </div>
            </div>
        </div>;
        _this.setState({popUpWindow: popUp}, () => {
            if (callBack !== null) {
                callBack();
            }
            return (popUp);
        });
    },

    closePopUpWindow: (_this) => {
        return closePopUpWindow(_this);
    },

    setMessage: (_this, msg, wait = 5000, autoDismiss = true) => {
        _this.setState({actionMsg: msg}, () => {
            // clear after a wait
            if (autoDismiss === true) {
                setTimeout(() => {
                    _this.setState({actionMsg: null});
                }, wait)
            }
        });
    },
    clearMessage: (_this) => {
        _this.setState({actionMsg: null});
    },

}

/*
    private functions
 */

const closePopUpWindow = (_this) => {
    _this.setState({popUpWindow: null});
};

export default PopUp;