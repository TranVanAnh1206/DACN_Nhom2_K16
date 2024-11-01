using BookStore.Datas.DbContexts;
using BookStore.Models.Models;
using Microsoft.AspNetCore.SignalR;

namespace BookStore.WebApi.Hubs
{
    public class NotificationHub : Hub
    {
        private readonly BookStoreDbContext _dbContext;

        public NotificationHub(BookStoreDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task SendNotificationToAll(string msg)
        {
            await Clients.All.SendAsync("ReceivedNotification", msg);
        }

        public async Task SendNotificationToAdmin(string msg, string username)
        {
            var hubConns = _dbContext.HubConnections.Where(conn => conn.UserName == username).ToList();

            foreach (var hubConn in hubConns)
            {
                await Clients.Client(hubConn.ConnectionId).SendAsync("ReceivedAdminNotification", msg, username);
            }
        }

        public override Task OnConnectedAsync()
        {
            Clients.Caller.SendAsync("OnConnected");

            return base.OnConnectedAsync();
        }

        public async Task SaveUserConnection(string username)
        {
            var connectionId = Context.ConnectionId;

            HubConnection hubConnection = new HubConnection
            {
                ConnectionId = connectionId,
                UserName = username,
            };

            _dbContext.HubConnections.Add(hubConnection);
            await _dbContext.SaveChangesAsync();
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            var hubConnection = _dbContext.HubConnections.FirstOrDefault(conn => conn.ConnectionId == Context.ConnectionId);

            if (hubConnection != null)
            {
                _dbContext.HubConnections.Remove(hubConnection);
                _dbContext.SaveChanges();
            }

            return base.OnDisconnectedAsync(exception);
        }

    }
}
