import MainLayout from "../widgets/mainLayout";
import TradersList from "../widgets/tradersList";


const AdminTraders = () => {
    return (
        <MainLayout heading="Трейдеры" isAdmin>
            <TradersList/>
        </MainLayout>
    );
};

export default AdminTraders;