from django.template import Library
from django import template

register = Library()

@register.filter(name='times') 
def times(number):
    return range(0, number, 2)

# templatetags/tag_library.py

@register.filter()
def to_int(value):
    return int(value)

@register.filter(name='range')
def _range(_min, args=None):
    _param = args.split(',')
    print("ARGUMENTO:" + _param[0])
    _max, _step = int(_param[0]), int(_param[1])
    args = filter(None, (_min, _max, _step))
    return range(*args)

@register.filter(name='rango')
def filter_range(start, end, step):
  return range(start, end, step)

@register.filter(name='update_variable')
def update_variable(value):
    data = value
    return data

'''
usage
{% ++ <var_name> %}
For example
{% ++ a %}
'''

def increment_var(parser, token):

    parts = token.split_contents()
    if len(parts) < 2:
        raise template.TemplateSyntaxError("'increment' tag must be of the form:  {% increment <var_name> %}")
    return IncrementVarNode(parts[1])

register.tag('++', increment_var)

class IncrementVarNode(template.Node):

    def __init__(self, var_name):
        self.var_name = var_name

    def render(self,context):
        try:
            value = context[self.var_name]
            context[self.var_name] = value + 1
            return u""
        except:
            raise template.TemplateSyntaxError("The variable does not exist.")