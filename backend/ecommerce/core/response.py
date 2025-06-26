from rest_framework.response import Response


class APIResponse:

    def __init__(self, status, message=None, data=None):
        self.status = status
        self.message = message
        self.data = data

    def to_dict(self):
        """
        Convert the response object to a dictionary for easy serialization to JSON.
        """
        response_dict = {
            'status': self.status,
            'message': self.message,
            'data': self.data
        }
        return response_dict
    
    def response(self):
        """
        Return Response in django rest reposne
        """
        return Response(self.to_dict(), self.status)