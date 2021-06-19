import NavBar from './landing/navbar';
import BodyContent from './landing/body';
import React from 'react';

class App extends React.Component {

    render() {
        return (
            <div>
                <>
                    <NavBar />
                    <BodyContent />
                </>
            </div>
        );
    }
}

export default App;