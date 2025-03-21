import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';



export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
}, {
  id: '2',
  deliveryDays: 3,
  priceCents: 499
}, {
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}];

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  return deliveryOption || deliveryOptions[0];
}

function isWeekend(date) {
  const dayOfWeek = date.format('dddd');
  return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
}

export function calculateDeliveryDate(deliveryOption){
  // I think you duplicate the deliveryOptionHTML function from orderSummary.js. 
  let today = dayjs();

  let remainDays = deliveryOption.deliveryDays;

  while(remainDays > 0){
    today = today.add(1,'day');

    if(!isWeekend(today)){
      remainDays--; 
    } 
  }
  const deliveryDate = today.add(remainDays, 'days');

  const dateString = deliveryDate.format('dddd MMMM D');

  return dateString;

}