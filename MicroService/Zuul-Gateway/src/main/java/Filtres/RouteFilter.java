package Filtres;

import com.netflix.zuul.ZuulFilter;

public class RouteFilter extends ZuulFilter {


	@Override
	public String filterType() {
		// TODO Auto-generated method stub
		return "Route";
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
		System.out.println("inside Route filter");
		return null;
	}

}
