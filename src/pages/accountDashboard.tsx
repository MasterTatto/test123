import MainLayout from "../widgets/mainLayout";
import DashboardTabs from "../widgets/dashboardTabs";
import {useGetAccountDashboardQuery} from "../store/API/userApi";
import {useLocation} from "react-router-dom";


const AccountDashboard = () => {
    const location = useLocation()
    const id = location?.pathname?.split('/').pop()
const {data, isLoading,error } = useGetAccountDashboardQuery(id)

    return (
        <MainLayout heading="Дашборд" accountNumber={data?.data?.login} typeAccount={data?.data?.server?.type}>
            <DashboardTabs dataDashboard={data?.data?.stats} />
        </MainLayout>
    );
};

export default AccountDashboard;