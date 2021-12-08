package Filtres;

import javax.servlet.http.HttpServletRequest;


import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;

public class PreFilter extends ZuulFilter{


	@Override
	public String filterType() {
		// TODO Auto-generated method stub
		return "Pre";
	}


	@Override
	public int filterOrder() {
		// TODO Auto-generated method stub
		return 1;
	}
	
	@Override
	public boolean shouldFilter() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public Object run() {
		RequestContext ctx = RequestContext.getCurrentContext();
		HttpServletRequest req = ctx.getRequest();
		System.out.println("request method "+req.getMethod()+
				"request URL "+req.getRequestURI());
		return null;
	}
}
