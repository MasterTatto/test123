import UsersList from "../widgets/usersList";
import MainLayout from "../widgets/mainLayout";


const Admin = () => {
    return (
        <MainLayout heading="Пользователи" isAdmin>
            <UsersList/>
        </MainLayout>
    );
};

export default Admin;