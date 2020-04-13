import { isPlainObject } from "lodash-es";
import React from "react";
import { getState, subscribe, unsubscribe } from "statezero";

class BaseReactComponent extends React.Component {
    componentWillMount() {
        const callback = state => {
            this.setState(state);
        };
        this._subscription = subscribe(callback, this.filterState.bind(this));
        const filteredState = this.filterState(getState());
        if (!isPlainObject(filteredState)) {
            throw new Error("The result of filterState() must be an object");
        }
        this.setState(filteredState);
    }

    componentWillUnmount() {
        unsubscribe(this._subscription);
    }

    filterState() {
        // Sub-classes must override this method.
        throw new Error("filterState() is not implemented");
    }
}

export default BaseReactComponent;
