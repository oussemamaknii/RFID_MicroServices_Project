package Filtres;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;

import org.springframework.cloud.netflix.zuul.filters.support.FilterConstants;
import org.springframework.http.HttpStatus;

import com.google.common.net.HttpHeaders;

@Component
public class CustomFilter extends ZuulFilter {

	private static Logger log = LoggerFactory.getLogger(PreFilter.class);

	@Override
	public String filterType() {
		return FilterConstants.PRE_TYPE;
	}

	@Override
	public int filterOrder() {
		return FilterConstants.SEND_FORWARD_FILTER_ORDER;
	}

	@Override
	public boolean shouldFilter() {
		return true;
	}

	@Override
	public Object run() {
		RequestContext ctx = RequestContext.getCurrentContext();
		String requestUrl = ctx.getRequest().getRequestURL().toString();

		if (requestUrl.equals("http://localhost:8763/user-service/User/customfilter")) {
			log.info("CustomFilter: Redirection ");
			String redirectUrl = "http://localhost:8763/user-service/User";
			try {
				ctx.getResponse().setStatus(HttpStatus.OK.value());
				ctx.getResponse().sendRedirect(redirectUrl);
				ctx.getResponse().flushBuffer();
			} catch (IOException ex) {
				System.out.println("Could not redirect to: " + redirectUrl);
			}
		}
		return null;
	}
}
