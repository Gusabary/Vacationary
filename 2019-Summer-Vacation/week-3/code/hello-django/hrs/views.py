from hrs.models import Dept
from django.http import JsonResponse

def index(request):
    queryset = Dept.objects.all()
    resp = []
    for dept in queryset:
        resp.append({
            "no": dept.no,
            "name": dept.name,
            "loc": dept.location
        })
    return JsonResponse(resp, safe=False)