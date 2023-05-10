import MainLayout from "../widgets/mainLayout";
import BrokerServersList from "../widgets/brokerServersList";


const AdminBrokerServers = () => {
    return (
        <MainLayout heading="Сервера брокера" isAdmin>
            <BrokerServersList/>
        </MainLayout>
    );
};

export default AdminBrokerServers;