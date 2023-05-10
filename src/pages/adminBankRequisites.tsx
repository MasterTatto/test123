import MainLayout from "../widgets/mainLayout";
import BankRequisitesList from "../widgets/bankRequisitesList";


const AdminBankRequisites = () => {
    return (
        <MainLayout heading="Банковские реквизиты" isAdmin>
            <BankRequisitesList/>
        </MainLayout>
    );
};

export default AdminBankRequisites;