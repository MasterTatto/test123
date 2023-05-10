import MainLayout from "../widgets/mainLayout";
import DashboardTabs from "../widgets/dashboardTabs";


const TraderDashboard = () => {
    return (
        <MainLayout>
            <DashboardTabs traderDashboard />
        </MainLayout>
    );
};

export default TraderDashboard;