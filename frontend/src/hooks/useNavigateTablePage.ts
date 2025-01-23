import { useCallback, useState } from "react";

export default function useNavigateTablePage() {

  const [page, setPage] = useState<number>(1);

  const onPressPreviousPage = useCallback(() => {
    if (page < 1) return;
    return setPage(page - 1);
  }, [page]);

  const onPressNextPage = useCallback(() => {
    return setPage(page + 1);
  }, [page]);

  return {
    page,
    onPressPreviousPage,
    onPressNextPage
  }

}