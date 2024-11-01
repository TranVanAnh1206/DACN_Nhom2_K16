using BookStore.Datas.DbContexts;
using BookStore.Models.Enums;
using BookStore.Models.Models;
using BookStore.WebApi.Hubs;
using Microsoft.Data.SqlClient;
using TableDependency.SqlClient;

namespace BookStore.WebApi.SubscribeTableDependencies
{
    public class SubscribeNotificationTableDependency : ISubscribeTableDependency
    {
        //npm install @microsoft/signalr

        SqlTableDependency<Notification> tableDependency;
        NotificationHub notificationHub;

        public SubscribeNotificationTableDependency(NotificationHub notificationHub)
        {
            this.notificationHub = notificationHub;
        }

        public void SubscribeTableDependency(string connectionString)
        {
            tableDependency = new SqlTableDependency<Notification>(connectionString);
            tableDependency.OnChanged += TableDependency_OnChanged;
            tableDependency.OnError += TableDependency_OnError;
            tableDependency.Start();
        }

        private void TableDependency_OnError(object sender, TableDependency.SqlClient.Base.EventArgs.ErrorEventArgs e)
        {
            Console.WriteLine($"{nameof(Notification)} SqlTableDependency error: {e.Error.Message}");
        }

        private async void TableDependency_OnChanged(object sender, TableDependency.SqlClient.Base.EventArgs.RecordChangedEventArgs<Notification> e)
        {
            if (e.ChangeType != TableDependency.SqlClient.Base.Enums.ChangeType.None)
            {
                var notification = e.Entity;

                if (notification.MessageType == NotificationTypeEnum.All)
                {
                    await notificationHub.SendNotificationToAll(notification.Message);
                }
                else if (notification.MessageType == NotificationTypeEnum.Admin)
                {
                    await notificationHub.SendNotificationToAdmin(notification.Message, notification.UserName);
                }
                else if (notification.MessageType == NotificationTypeEnum.Client)
                {

                }
            }
        }
    }
}
