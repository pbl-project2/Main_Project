import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { db } from '../firebase/firebase';
import "../Styling/Admin.css";
import "../Styling/Analytics.css";
import AnalyticsUserData from './AnalyticsUserData';
function Analytics() {
	const history = useHistory();
	const [users, setUsers] = useState([]);
	const [orders, setOrders] = useState(0);
	var sales = 0;
	const [adminSales, setAdminSales] = useState(sales);

	useEffect(() => {
		db.collection("users").orderBy("timestamp", "desc").onSnapshot((snapshot) => {
			let usersArr = [];
			snapshot.forEach((doc) => {
				if (doc.data().completed === true && doc.data().email === window.location.pathname.split("/")[2]) {
					usersArr.push({ ...doc.data(), id: doc.id });
					console.log(doc.data().total);
					sales += doc.data().total;
				}
				setUsers(usersArr);
				setOrders(usersArr.length);
				db.collection("admin").doc(`${window.location.pathname.split("/")[2]}`).update({
					sales: sales
				});
				console.log(usersArr);

			});
		});
	}, []);

	useEffect(() => {
		db.collection("admin").doc(`${window.location.pathname.split("/")[2]}`).onSnapshot((snapshot) => {
			setAdminSales(snapshot.data().sales);
		});
	}, []);

	setTimeout(function () {
		window.location.reload();
	}, 60000);

	return (
		<div className="main_analytics">
			<div className='analytics'>
				<nav>
					<h3>UpMenu</h3>
					<div className="right">
						<button
							className="login-btn"
							onClick={() => history.push(`/admin-login/${window.location.pathname.split("/")[2]}`)}
						>
							Back
						</button>
					</div>
				</nav>

				<div className="divs-combine row">
					<div className="income col">
						<h1>You're Sales</h1>
						<h3>{adminSales}</h3>
					</div>
					<div className="served-orders col">
						<h1>Orders Served</h1>
						<h3>{orders}</h3>
					</div>
				</div>

				<div className="main_orders">
					<div className='orders'>
						{users?.map((user) => (
							<AnalyticsUserData
								key={user.id}
								user={user}
							// handleDelete={handleDelete}
							// food={food}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Analytics;