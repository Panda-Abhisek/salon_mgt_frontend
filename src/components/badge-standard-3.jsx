import { Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";

export const title = "Badge with Icon on Left";

const Example = () => (
  <Badge className='rounded'>
    <Star className="mr-1 size-3" />
    Recommended
  </Badge>
);

export default Example;
