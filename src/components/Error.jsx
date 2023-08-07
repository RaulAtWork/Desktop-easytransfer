import React from "react";

export default function ErrorMessage({ touched, error }){
    if (!touched) {
        return null;
    }
    if (error) {
        return <div className="invalid-msg">{error}</div>;
    }
    return null
};
