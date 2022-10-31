import { useState } from "react";

function SummaryPage() {
  const [checked, setChecked] = useState<boolean>(false);

  const handleChange = () => setChecked(!checked);

  return (
    <div>
      <h2>주문확인</h2>
      <input
        id='confirm'
        type='checkbox'
        checked={checked}
        onChange={handleChange}
      />
      <label htmlFor='confirm'>주문을 확정합니까?</label>

      <button type='button' disabled={!checked}>
        확정
      </button>
    </div>
  );
}

export default SummaryPage;
