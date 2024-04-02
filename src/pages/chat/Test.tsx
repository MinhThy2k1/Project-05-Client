import React from 'react'
import "./test.scss"
export default function Test() {
    return (
        <div className="container bootstrap snippets bootdey">
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <div className="portlet portlet-default">
                        <div className="portlet-heading">
                            <div className="portlet-title">
                                <h4>
                                    <i className="fa fa-circle text-green" /> Jane Smith
                                </h4>
                            </div>
                            <div className="portlet-widgets">
                                <div className="btn-group">
                                    <button
                                        type="button"
                                        className="btn btn-white dropdown-toggle btn-xs"
                                        data-toggle="dropdown"
                                    >
                                        <i className="fa fa-circle text-green" /> Status
                                        <span className="caret" />
                                    </button>
                                    <ul className="dropdown-menu" role="menu">
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-circle text-green" /> Online
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-circle text-orange" /> Away
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-circle text-red" /> Offline
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <span className="divider" />
                                <a data-toggle="collapse" data-parent="#accordion" href="#chat">
                                    <i className="fa fa-chevron-down" />
                                </a>
                            </div>
                            <div className="clearfix" />
                        </div>
                        <div id="chat" className="panel-collapse collapse in">
                            <div>
                                <div
                                    className="portlet-body chat-widget"
                                    style={{ overflowY: "auto", width: "auto", height: 300 }}
                                >
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <p className="text-center text-muted small">
                                                January 1, 2014 at 12:23 PM
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="media">
                                                <a className="pull-left" href="#">
                                                    <img
                                                        className="media-object img-circle img-chat"
                                                        src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                                        alt=""
                                                    />
                                                </a>
                                                <div className="media-body">
                                                    <h4 className="media-heading">
                                                        Jane Smith
                                                        <span className="small pull-right">12:23 PM</span>
                                                    </h4>
                                                    <p>
                                                        Hi, I wanted to make sure you got the latest product
                                                        report. Did Roddy get it to you?
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="media">
                                                <a className="pull-left" href="#">
                                                    <img
                                                        className="media-object img-circle img-chat"
                                                        src="https://bootdey.com/img/Content/avatar/avatar6.png"
                                                        alt=""
                                                    />
                                                </a>
                                                <div className="media-body">
                                                    <h4 className="media-heading">
                                                        John Smith
                                                        <span className="small pull-right">12:28 PM</span>
                                                    </h4>
                                                    <p>Yeah I did. Everything looks good.</p>
                                                    <p>Did you have an update on purchase order #302?</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="media">
                                                <a className="pull-left" href="#">
                                                    <img
                                                        className="media-object img-circle img-chat"
                                                        src="https://bootdey.com/img/Content/avatar/avatar6.png"
                                                        alt=""
                                                    />
                                                </a>
                                                <div className="media-body">
                                                    <h4 className="media-heading">
                                                        Jane Smith
                                                        <span className="small pull-right">12:39 PM</span>
                                                    </h4>
                                                    <p>
                                                        No not yet, the transaction hasn't cleared yet. I will
                                                        let you know as soon as everything goes through. Any
                                                        idea where you want to get lunch today?
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            </div>
                            <div className="portlet-footer">
                                <form role="form">
                                    <div className="form-group">
                                        <textarea
                                            className="form-control"
                                            placeholder="Enter message..."
                                            defaultValue={""}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <button type="button" className="btn btn-default pull-right">
                                            Send
                                        </button>
                                        <div className="clearfix" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                {/* /.col-md-4 */}
            </div>
        </div>
    )
}
