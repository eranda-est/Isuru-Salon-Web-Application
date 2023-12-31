import React,{ Fragment, useRef} from "react";
import { useReactToPrint} from 'react-to-print';
import { useEffect,useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from "react-bootstrap";
import Logo from '../../images/logo.jpg';

const ReactPdfPrint = () => {

const [posts, setPosts] = useState([]);
const [income, SetIncome] = useState(0);
const [expenses, SetExpenses] = useState(0);

    useEffect(() => {
        axios.get("/api/Fin/trans")
            .then((res) => {
                console.log(res)
                setPosts(res.data);
            })
            .catch((err) => console.log(err));
}, []);

useEffect(() => { 
    let amount1 = 0;
    let amount2 = 0;
    if(posts){
        posts.map((post) => {
            if(post.type == "Income"){
                amount1 = amount1 + post.amount;
            }
            else{
                amount2 = amount2 + post.amount;
            }
    })
    SetIncome(amount1);
    SetExpenses(amount2);
    }

}, [posts]);

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'salon-packages',
        onAfterPrint: ()=> alert('Print success')
    });

    return (

        <Fragment>
            <div className="finance-report">
            <div ref={componentRef} style={{width: '100%', height: '100%', background:"white", backgroundColor:"white"}}>
            <div className="container mt-3" style={{background:"white", backgroundColor:"white"}}>
                <img src={Logo} style={{width:'20%', height:'20%', marginLeft:'0%', marginBottom:'2%'}}></img>
                <div style={{width:'20%', height:'20%', marginRight:'0%', marginTop:'-19%'}}>
                    <h5>Isuru Salon</h5>
                    <br></br>
                    <h6>  225/2J</h6>
                    <h6>  High Level Road</h6>
                    <h6>  Homagama</h6>
                    </div>
            </div>
            <br /><br /><br /><br />
                <h3 className="text-center my-3 border py-2" style={{fontWeight:"bold"}}>Finance Report</h3>
                <br />

                <div className="container">
                    <div className="reportincome">
                        Income - LKR.
                        <span>{income} </span>
                    </div>
                    <div className="reportincome">
                        Expenses - LKR.
                        <span>{expenses} </span>
                    </div>
                    <div className="reportbalance">
                        Balance - LKR.
                        <span>{income - expenses} </span>
                    </div>
                </div>

                <br/>
                <Table className="w-75 mx-auto" bordered>
                    <thead>
                        <th>Amount</th>
                        <th>Type</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Reference</th>
                    </thead>
                    <tbody>
                    {posts ? (
                        <Fragment>
                            {posts.map((post) => {
                                return (
                                        <tr key={post._id} >
                                            <td>{post.amount}</td>
                                            <td>{post.type}</td>
                                            <td>{post.category}</td>
                                            <td>{post.date}</td>
                                            <td>{post.description}</td>
                                            <td>{post.reference}</td>
                                        </tr>
                                        );
                            })}
                        </Fragment>
                    ) : (
                     ""
                    )}
                    </tbody>
                </Table>
            </div>
            <br />
            <center>
                <button className="btn btn-secondary" style={{ borderRadius:"5px", width:"20%"}} onClick={handlePrint}>Download</button>
            </center>
            <br /><br /><br />
            </div>
        </Fragment>
    );
};

export default ReactPdfPrint;