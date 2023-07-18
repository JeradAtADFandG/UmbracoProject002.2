
                @inherits umbraco.MacroEngines.DynamicNodeContext
@{ 
    int pageSize;// How many items per page
    int page;// The page we are viewing

    /* Set up parameters */
    
    if (!int.TryParse(Parameter.PageSize,out pageSize))
    {
        pageSize =6;
    }

    if (!int.TryParse(Request.QueryString["page"],out page))
    {
        page =1;
    }

    /* This is your basic query to select the nodes you want */

    var nodes = Model.Children.Where("Visible").OrderBy("displayDate desc");
    
    int totalNodes = nodes.Count();
    int totalPages = (int)Math.Ceiling((double)totalNodes /(double)pageSize);
    
    /* Bounds checking */
    
    if (page > totalPages)
    {
        page = totalPages;  
    }
    elseif (page <1)
    {
        page = 1;
    }
}

<h2>Found @totalNodes results.Showing Page @page of @totalPages</h2>

<ul>
    @foreach (var item in nodes.Skip((page - 1) * pageSize).Take(pageSize))
    {
        <li><a href="@item.Url">@item.Name</a>(@item.DisplayDate.ToShortDateString())</li>
    }
</ul>

<ul class="paging">
    @for (int p = 1; p < totalPages + 1; p++)
    {
        string selected = (p == page) ? "selected" : String.Empty;
        <li class="@selected"><a href="?page=@p" title="Go to page @p of results">@p</a></li> 
    }
</ul>