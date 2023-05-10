import MainLayout from "../widgets/mainLayout";
import ForexListAccounts from "../widgets/forexListAccounts";

const AdminForexAccounts = () => {
    return (
        <MainLayout heading="Forex счета" isAdmin>
            <ForexListAccounts/>
        </MainLayout>
    );
};

export default AdminForexAccounts;