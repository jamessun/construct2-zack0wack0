from os import path as op

from datetime import datetime

import tornado.web
import tornadio
import tornadio.router
import tornadio.server

ROOT = op.normpath(op.dirname(__file__))

class IndexHandler(tornado.web.RequestHandler):
    """Regular HTTP handler to serve the ping page"""
    def get(self):
        return

class PingConnection(tornadio.SocketConnection):
    def on_open(self, request, *args, **kwargs):
        self.ip = request.remote_ip

    def on_message(self, message):
        self.send(message)

PingRouter = tornadio.get_router(PingConnection)

application = tornado.web.Application(
    [(r"/", IndexHandler), PingRouter.route()],
    socket_io_port = 8001,
    flash_policy_port = 843,
    flash_policy_file = op.join(ROOT, 'flashpolicy.xml')
)

if __name__ == "__main__":
    tornadio.server.SocketServer(application)