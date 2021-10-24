from io import BytesIO,StringIO
from django.http import HttpResponse
from django.template.loader import get_template

from xhtml2pdf import pisa

def render_to_pdf(template_src, context_dict={}):
    template = get_template(template_src)
    html  = template.render(context_dict)
    # html = '<pre>இது முதல் கேள்வி1 பதில்1 பதில்2 பதில்3 பதில்4</pre>'
    # html = 'csdcsdc'
    print(html)
    result =BytesIO()
    pdf = pisa.pisaDocument(BytesIO(html.encode('utf-8')), result)
    if not pdf.err:
        return result.getvalue()
        return HttpResponse(result.getvalue(), content_type='application/pdf')
    return None

def phoneVerify(request):
    return HttpResponse(request,'main/phoneverify')
