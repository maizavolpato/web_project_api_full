import React from 'react';

function InfoTooltip({ isOpen, onClose, isSuccess, message }) {
    return (
        <div className={`popup ${isOpen ? 'popup_open' : ''}`}>
            <div className="popup__container">
                <button
                className="popup__button-close"
                type="button"
                onClick={()=> {
                    onClose()}
                }
                >
                </button>
                <div className={`popup__icon ${isSuccess ? 'popup__icon_success' : 'popup__icon_error'}`}>
                </div>
                <p className="popup__message">{message || "mensagem teste"}</p>
                
            </div>
        </div>
        
    )
}

export default InfoTooltip;