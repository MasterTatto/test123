import MainLayout from "../widgets/mainLayout";
import AdminSetsList from "../widgets/adminSetsList";


const AdminSets = () => {

    return (
        <MainLayout heading="Сеты" isAdmin>
            <AdminSetsList/>
        </MainLayout>
    );
};

export default AdminSets;