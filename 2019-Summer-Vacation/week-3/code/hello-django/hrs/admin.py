from django.contrib import admin

from hrs.models import Emp, Dept


class DeptAdmin(admin.ModelAdmin):

    list_display = ('no', 'name', 'location')
    ordering = ('no', )


class EmpAdmin(admin.ModelAdmin):

    list_display = ('no', 'name', 'job', 'mgr', 'sal', 'comm', 'dept')
    search_fields = ('name', 'job')


admin.site.register(Dept, DeptAdmin)
admin.site.register(Emp, EmpAdmin)