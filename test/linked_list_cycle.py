# Definition for singly-linked list.
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

class Solution:
    def hasCycle(self, head: ListNode) -> bool:
        nodes = []
        while True:
            if not head:
                return False
            elif head in nodes:
                return True
            else:
                nodes.append(head)
                head = head.next