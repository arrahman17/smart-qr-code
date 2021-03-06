import React, {Component} from 'react';
import Button from "@material-ui/core/es/Button/Button";
import TextField from "@material-ui/core/es/TextField/TextField";
import Header from "../header/Header";
import {createNewBoardData} from "../../utils/Connection";
import QRCode from "qrcode-react";
import {LinkContainer} from "react-router-bootstrap";

class Home extends Component {

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    constructor(props) {
        super(props);

        this.state = {
            title: "",
            boardLink: "",
            QRcode: ""
        };
    }

    validateForm() {
        return this.state.title.length > 0;
    }

    createNewBoard(event) {
        let title = this.state.title;
        createNewBoardData(title)
            .then((result) => {
                console.log("status1: " + result);
                if (result.status === 200) {
                    let boardTagCode = result.data.boardTagCode;
                    this.setState({
                        boardLink: boardTagCode
                    });
                }
                else {
                    console.log("status3: " + result);
                }
            })
            .catch(error => {
                console.log("status4: " + error);
            });
        event.preventDefault();
    }

    render() {
        return <div className="App container">
            <Header/>
            <div className="row vertical-center">

                <div className="pl-5 col-12 col-sm-6">
                    {/*<p><h1 className="font-weight-bold" style={{color: "#a50111"}}>&lt;EXPAND&gt;</h1></p>*/}
                    {/*<p><h2 className="font-weight-light" >your knowledge</h2></p>*/}


                    <img src="../../../images/home.png"/>


                </div>
                <div className="col-12 col-sm-6 registration-clean">
                    <form method="post"
                          onSubmit={this.createNewBoard.bind(this)}>
                        <h2>Create New Board</h2>

                        <div className="form-group">
                            <TextField
                                id="title"
                                label="Title"
                                placeholder="type board title"
                                name="title"
                                value={this.state.email}
                                onChange={this.handleChange}
                                margin="normal"
                                className="form-control"/>
                        </div>

                        <div className="form-group">
                            <Button variant="contained" color="primary" type="submit" disabled={!this.validateForm()}>
                                Create
                            </Button>
                        </div>

                        {this.state.boardLink.length > 0 ? (
                            <div>
                            <QRCode value={this.state.QRcode = window.location.href + "board?id=" + this.state.boardLink}/>
                                <LinkContainer to={"board?id=" + this.state.boardLink}>
                                    <a className="nav-link text-dark font-weight-bold">
                                        {this.state.QRcode}
                                    </a>
                                </LinkContainer>
                            </div>
                        ) : (null)}

                    </form>
                </div>

            </div>

        </div>;
    }
}

export default Home;