const mockPush = jest.fn();

export const useRouter = () => ({
  push: mockPush,
});
