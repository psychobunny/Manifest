<div class="my-3 p-3 bg-white rounded shadow-sm">
    <h6 class="border-bottom border-gray pb-2 mb-0">Categories</h6>

    <!-- BEGIN categories -->
    <div class="media text-muted pt-3">
        <svg class="bd-placeholder-img mr-2 rounded" width="40" height="40" xmlns="http://www.w3.org/2000/svg">
        <g>
            <rect width="100%" height="100%" fill="{categories.bgColor}"></rect>
        </g>
        </svg>
      <p class="media-body pb-3 mb-0 small lh-125 ">
        <strong class="d-block text-gray-dark">{categories.name}</strong>
        {categories.description}
      </p>
    </div>
    <!-- END categories -->
  </div>