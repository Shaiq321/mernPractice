export default function calculateRating(reviews)

  {
    const rating_items=reviews.map((curElem)=>{
      let {rating}=curElem
      return rating
    })
      const rating_items_count=rating_items.length
      const rating_items_sum= rating_items.reduce((a, b) => a + b, 0)
      let reviewee_rating= (rating_items_sum/(5*rating_items_count))*5
      switch(true)
      {
        case reviewee_rating>4.5:
        reviewee_rating=5
        break;
        case reviewee_rating>4:
        reviewee_rating=4.5
        break;
        case reviewee_rating>3.5:
        reviewee_rating=4
        break;
        case reviewee_rating>3:
        reviewee_rating=3.5
        break;
        case reviewee_rating>2.5:
        reviewee_rating=3
        break;
        case reviewee_rating>2:
        reviewee_rating=2.5
        break;
        case reviewee_rating>1.5:
        reviewee_rating=2
        break;
        case reviewee_rating>1:
        reviewee_rating=1.5
        break;
        case reviewee_rating>0.5:
        reviewee_rating=1
        break;
        case reviewee_rating>0.0:
        reviewee_rating=0.5
        break;
        default:
          reviewee_rating=0
      }
      const data ={rating_items_count,reviewee_rating}
      return data
    
    }