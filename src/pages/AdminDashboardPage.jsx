import '../pages/AdminDashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminDashboardPage = () => {

    const users = JSON.parse(localStorage.getItem('loggedInUser')) || [];
    const name = users.firstname;

    return (
        <div className='admin-dashboard'>
            <div className='admin-content'>
                <h1>Hello, {name}!</h1>
                <h2>Welcome to your Admin Dashboard</h2>
                <p>Get ready to manage your courses and students effectively!</p>
            </div>
        </div>
    );
}

export default AdminDashboardPage;